import React from "react";
import Konva from "konva"
import { useLayoutEffect } from "react"
import { ExamFunctions } from "../../store/exam/functions";
import { ExamHook } from "../../store/exam/hooks";
import { QuestionRender } from "question-convert"
import { EXAM_STATUS } from "../../constants";

const RADIUS = 6;
type Point = {
    x: number, y: number, is_left: boolean,
    is_selected?: boolean,
    id: string
}


const isBelongCricle = ({ point, circle }: {
    point: { x: number, y: number },
    circle: { x: number, y: number, radius: number }
}) => {
    return (point.x - circle.x) * (point.x - circle.x) + (point.y - circle.y) * (point.y - circle.y) <= circle.radius * circle.radius
}

const getClosestPoint = (point: { x: number, y: number }, points: Point[]) => {
    // console.log("POINT___", point)
    for (const p of points) {
        if (isBelongCricle({ point, circle: { ...p, radius: RADIUS } })) {
            return p;
        }
    }
    return null;
}
const resetPoint = (point_pos: number[], points: Point[], is_multi ?: boolean) => {
    let point_start, point_end;
    for (const point of points) {
        if (isBelongCricle({
            point: { x: point_pos[0], y: point_pos[1] },
            circle: { x: point.x, y: point.y, radius: RADIUS }
        })) {
            point_start = point;
        }

        if (isBelongCricle({
            point: { x: point_pos[2], y: point_pos[3] },
            circle: { x: point.x, y: point.y, radius: RADIUS }
        })) {
            point_end = point;
        }
    }

    if (point_start && point_end) {
        if (point_start.x === point_end.x && point_start.y === point_end.y
            || (point_start.is_left === point_end.is_left) 
            || (point_end.is_selected && !is_multi)
            ) {
            point_start.is_selected = false;
            return []
        }

        if (!point_end.is_left && !is_multi){
            point_end.is_selected = true;
        } 
        if (!point_start.is_left && !is_multi) {
            point_start.is_selected = true;
        } 
        return [point_start.x, point_start.y, point_end.x, point_end.y]
    }

    if (point_start && !point_end) {
        point_start.is_selected = false
    }

    return []
}

const toggleLine = (line: Konva.Line, lines: Konva.Line[])=>{
    const points = line.getAttr("points");
    //@ts-ignore
    for(const [index, l] of lines.entries()){
        const _points = l.getAttr("points");
        if ((points[0] === _points[0] && points[1] === _points[1] && points[2] === _points[2] && points[3] === _points[3])
        || (points[0] === _points[2] && points[1] === _points[3] && points[2] === _points[0] && points[3] === _points[1])
        ){
            lines.splice(index, 1);
            break;
        }
    }
    lines.push(line)
}

const getLine = (points: number[], lines: Konva.Line[] )=>{
    //@ts-ignore
    for (const [index, l] of lines.entries()) {
        const _points = l.getAttr("points");
        if ((points[0] === _points[0] && points[1] === _points[1] && points[2] === _points[2] && points[3] === _points[3])
            || (points[0] === _points[2] && points[1] === _points[3] && points[2] === _points[0] && points[3] === _points[1])
        ) {
           return l;
        }
    }
    return null;
}
const getConnect = (point_pos: number[], points: Point[]) => {
    let src = '';
    let dist = '';
    for (const p of points) {
        if (p.x === point_pos[0] && p.y === point_pos[1]) {
            src = p.id
        }

        if (p.x === point_pos[2] && p.y === point_pos[3]) {
            dist = p.id
        }
    }

    return { src, dist }
}

const checkColor = (question: QuestionRender, connect: string, is_view?: boolean) => {
    return is_view ? '#22c55e'
        : connect && question.solutions[connect] && question.status ? '#22c55e'
            : connect && !question.solutions[connect] && question.status ? 'red'
                : 'orange'
}

const border = (question: QuestionRender, connect: string, is_view?: boolean)=>{
    return (is_view || (question.answer_pupil[connect] && question.status)) ? [] : [6,6,6,6];
}


const ConnectAnswer = ({ question, is_multi, is_view }: { question: QuestionRender, is_multi?: boolean, is_view?: boolean})=>{

    const is_doing = ExamHook.useIsDoing();

    useLayoutEffect(()=>{
        let labels : string[] = [];
        labels = question.answers.reduce((pre, cur)=>{
            if (cur.label && !pre.includes(cur.label)){
                pre.push(cur.label)
            }
            return pre;
        }, labels)
        
        const container = document.querySelector('#stage-parent');
        if(container){
            //@ts-ignore
            const container_width = container.offsetWidth;
            const stage = new Konva.Stage({
                container: `container-${question.id}-${is_view ? 'view' : 'answer'}`,
                width: container_width,
                height: 1000,
            });
            const GROUP_WIDTH = Math.floor(container_width / 5);
            const GROUP_DIST = GROUP_WIDTH * 2;
            const MARGIN_LEFT = container_width - GROUP_WIDTH * 2 - GROUP_DIST ;
            const MARGIN_BOTTOM = 30;

            const layer = new Konva.Layer();
            stage.add(layer);
            let is_drawing = false;
            let line_current: Konva.Line;
            let point_pos: number[] = [];
            let connect: string = '';
            let rects: any[] = [];
            let circles: any[] = [];

            const lines: Konva.Line[] = [];
            const points: Point[] = [];
            let line_connect_cur = {
                src: '', dist: ''
            }

            const drawLine = () => {
                line_current = new Konva.Line({
                    stroke: checkColor(question, connect, is_view),
                    strokeWidth: 2,
                    points: point_pos,
                    lineCap: 'round',
                    lineJoin: 'round',
                    dash: border(question, connect, is_view),
                });
                line_current.zIndex(3);
                line_current.on('mouseenter', function () {
                    stage.container().style.cursor = 'pointer';
                });

                line_current.on('mouseleave', function () {
                    stage.container().style.cursor = 'default';
                });

                line_current.on("mousedown", (e) => {
                   if(is_doing !== EXAM_STATUS.VIEW){
                       const cx = stage.getPointerPosition()?.x;
                       const cy = stage.getPointerPosition()?.y;
                       // // console.log({cx, cy})
                       if (e.target && cx && cy) {
                           const p_closest = getClosestPoint(
                               { x: cx, y: cy },
                               points
                           )
                           if (p_closest) {
                               is_drawing = true;
                               point_pos = e.target.getAttr("points");
                               const _line = getLine(point_pos, lines);
                               if (_line) {
                                   line_current = _line;
                                   p_closest.is_selected = false;
                                   line_connect_cur = getConnect(point_pos, points)
                                   // line_connect_cur = getConnect(point_pos, points)
                                   // console.log({ p_closest }, { line_current })
                                   if (point_pos[0] === p_closest.x && point_pos[1] === p_closest.y) {
                                       point_pos[0] = point_pos[2];
                                       point_pos[1] = point_pos[3];
                                       point_pos[2] = p_closest.x;
                                       point_pos[3] = p_closest.y;
                                   }

                                   if (point_pos[2] === p_closest.x && point_pos[3] === p_closest.y) {
                                       point_pos[2] = p_closest.x;
                                       point_pos[3] = p_closest.y;
                                   }
                                   // console.log("AFTER: ", { ...point_pos })
                                   line_current.setAttr("points", point_pos)
                               }
                           }
                       }
                   }
                })
                // console.log("MOVE DOWN")
                layer.add(line_current);
                return line_current
            }

            stage.on('mousemove', () => {
                if (is_drawing) {
                    const pos = stage.getPointerPosition();
                    if (pos?.x && pos?.y) {
                        point_pos[2] = pos.x;
                        point_pos[3] = pos.y
                    }
                    if (line_current) {
                        // console.log({ ...point_pos })
                        line_current.setAttrs({
                            points: point_pos
                        })
                    }
                }
            })

            stage.on('mouseup', () => {
                is_drawing = false;
                if (point_pos.length) {
                    const n_points = resetPoint(point_pos, points, is_multi);
                    // console.log("MOUSE UP:", { ...n_points })
                    ExamFunctions.drawLine(line_connect_cur);
                    line_connect_cur = { src: '', dist: '' }
                    ExamFunctions.drawLine(getConnect(n_points, points))
                    line_current.setAttr("points", n_points)

                    if(n_points.length){
                        toggleLine(line_current, lines)
                    }
                }
                point_pos = [];
            })

            let height_left = 20;
            let height_right = 20;
            let dy = 0;
            const group_lefts = [];
            const group_rights = [];

            for(const ans of question.answers){
                if (typeof ans.content[0].data === 'string'){
                    const text = new Konva.Text({
                        text: ans.content[0].data.replace('</br>', '\n'),
                        fontSize: 18,
                        fontFamily: 'Calibri',
                        fill: '#000',
                        width: GROUP_WIDTH ,
                        padding: 10,
                        align: 'center',
                        
                    });
                    const text_height = text.getAttr('height');
                    if (ans.label === labels[0]){
                        dy = height_left
                        height_left += text_height + 30;
                    }else{
                        dy = height_right
                        height_right += text_height + 30;
                    }

                    const dx = ans.label === labels[0] ? MARGIN_LEFT : MARGIN_LEFT + GROUP_DIST;
                    const group = new Konva.Group({
                        id: ans.id,
                        x: dx,
                        y: dy,
                        width: GROUP_WIDTH,
                        height: text_height,
                    });

                    if (ans.label === labels[0]) {
                        group_lefts.push(group)
                    } else {
                       group_rights.push(group);
                    }

                    const rect = new Konva.Rect({
                        id: ans.id,
                        width: GROUP_WIDTH,
                        height: text_height,
                        // fill: 'lightblue',
                        stroke: 'orange',
                        dash: border(question, connect, is_view),
                        cornerRadius: 10
                    })


                    const c_x = ans.label === labels[0] ? GROUP_WIDTH : 0;
                    const c_y = text_height / 2
                    points.push({
                        x: c_x + dx, y: c_y + dy, is_left: ans.label === labels[0], id: ans.id
                    })
                    
                    const circle = new Konva.Circle({
                        x: c_x,
                        id: ans.id,
                        y: c_y,
                        radius: RADIUS,
                        stroke: 'orange',
                        fill: 'white'

                    })

                    group.add(rect);
                    group.add(text);
                    group.add(circle);

                    circle.on('mouseenter', function () {
                        stage.container().style.cursor = 'pointer';
                    });

                    circle.on('mouseleave', function () {
                        stage.container().style.cursor = 'default';
                    });

                    circle.on('mousedown', function (e) {
                        if (is_doing !== EXAM_STATUS.VIEW){
                            const { x, y } = e.target.getAbsolutePosition()
                            const point_closest = getClosestPoint({
                                x: x, y: y
                            }, points)

                            if (
                                // point_closest && point_closest.is_selected || 
                                !point_closest) {
                                return;
                            }

                            is_drawing = true;
                            point_pos.push(point_closest.x, point_closest.y)
                            drawLine();
                        }
                    });

                    layer.add(group);
                    rects.push(rect);
                    circles.push(circle);
                    
                    // Draw line answer
                    if (points.length === question.answers.length) {

                        if(height_left < height_right){
                            const _dy = Math.floor((height_right - height_left)/2);
                            for(const group of group_lefts){
                                group.setAttr("y", group.getAttr("y") + _dy);
                                for (const point of points){
                                    if(point.id === group.getAttr("id")){
                                        point.y += _dy;
                                    }
                                }
                            } 
                        }else{
                            const _dy = Math.floor((height_left - height_right) / 2);
                            for (const group of group_rights) {
                                group.setAttr("y", group.getAttr("y") + _dy);
                                for (const point of points) {
                                    if (point.id === group.getAttr("id")) {
                                        point.y += _dy;
                                    }
                                }
                            }
                        }

                        const answers = is_view ? question.solutions : question.answer_pupil;
                        for (const key of Object.keys(answers)) {
                            const items = key.split("_");
                            let point_src, point_dist;
                            for (const point of points) {
                                if (point.id === items[0]) {
                                    point_src = point;
                                }
                                if (point.id === items[1]) {
                                    point_dist = point;
                                }
                            }
                            if (point_dist && point_src) {
                                point_pos = [point_src.x, point_src.y, point_dist.x, point_dist.y];
                                point_src.is_selected = true;
                                point_dist.is_selected = true;
                                connect = point_dist.id > point_src.id ? point_src.id + '_' + point_dist.id : point_dist.id + '_' + point_src.id
                                // Tô lại màu viền cho hình ảnh
                                for (const rec of rects) {
                                    const rec_id = rec.getAttr("id");
                                    if (rec_id === point_src.id || rec_id === point_dist.id) {
                                        rec.setAttr("stroke", checkColor(question, connect, is_view))
                                        rec.setAttr("dash", border(question, connect, is_view))
                                    }
                                }

                                for (const circle of circles) {
                                    const circle_id = circle.getAttr("id");
                                    if (circle_id === point_src.id || circle_id === point_dist.id) {
                                        circle.setAttr("stroke", checkColor(question, connect, is_view))
                                    }
                                }

                                line_current = drawLine()
                                toggleLine(line_current, lines)
                                point_pos = [];
                                connect = '';
                            }
                        }
                        stage.setAttr("height",  Math.max(height_left, height_right) + MARGIN_BOTTOM)
                    }
                }
            }

        }
    }, [is_multi, question.id])

    return (
        <div id={`container-${question.id}-${is_view ? 'view' : 'answer'}`}></div>
    )
}

export default ConnectAnswer