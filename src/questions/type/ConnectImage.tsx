import Konva from "konva";
import { useLayoutEffect } from "react"
import { QuestionRender } from "question-convert";
import { EXAM_STATUS } from "../../constants";
import { onDrawLine } from "../types";

const RADIUS = 6;


type Point = {
    x: number, y: number, is_up: boolean,
    is_selected?: boolean,
    id: string
}

const isBelongCricle = ({ point, circle }: {
    point: { x: number, y: number },
    circle: { x: number, y: number, radius: number }
}) => {
    return (point.x - circle.x) * (point.x - circle.x) + (point.y - circle.y) * (point.y - circle.y) <= circle.radius * circle.radius
}

const resetPoint = (point_pos: number[], points: Point[]) => {
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
            || (point_start.is_up === point_end.is_up) || point_end.is_selected) {
            point_start.is_selected = false;
            return []
        }

        point_end.is_selected = true;
        point_start.is_selected = true;
        return [point_start.x, point_start.y, point_end.x, point_end.y]
    }

    if (point_start && !point_end) {
        point_start.is_selected = false
    }

    return []
}

const getClosestPoint = (point: { x: number, y: number }, points: Point[]) => {
    for (const p of points) {
        if (isBelongCricle({ point, circle: { ...p, radius: RADIUS } })) {
            return p;
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
    return is_view ? 'green'
        : connect && question.solutions[connect] && question.status ? 'green'
            : connect && !question.solutions[connect] && question.status ? 'red'
                : 'orange'
}

const border = (question: QuestionRender, connect: string, is_view?: boolean) => {
    return (is_view || (question.answer_pupil[connect] && question.status)) ? [] : [6, 6, 6, 6];
}


const ConnectImage = ({ 
    question, 
    is_view, 
    onDrawLine,
    exam_status, 
}: { 
    question: QuestionRender, 
    is_view?: boolean,
    onDrawLine: onDrawLine,
    exam_status: number,
 }) => {

    useLayoutEffect(() => {
        const container = document.querySelector('#stage-parent');
        if (container) {

            //@ts-ignore
            const container_width = container.offsetWidth;
            const item_num = question.answers.length;
            const IMG_WIDTH = Math.round(container_width / (item_num/2+2));
            const IMG_HEIGHT = IMG_WIDTH;
            const IMG_MARGIN = Math.round(IMG_WIDTH / (item_num/2+2)) ;
            const IMG_PADDING = IMG_MARGIN;
            //@ts-ignore
            var stage = new Konva.Stage({
                container: `container-${question?.id}-${is_view ? 'view' : 'answer'}`,
                width: container_width,
                height: 1000,
            });
            var layer = new Konva.Layer();
            stage.add(layer);
            let is_drawing = false;
            let line_connect_cur = {
                src: '', dist: ''
            }
            let line_current: Konva.Line;
            let point_pos: number[] = [];
            let connect: string = '';
            let rects: any[] = [];

            const points: Point[] = [];


            const drawLine = () => {
                line_current = new Konva.Line({
                    stroke: checkColor(question, connect, is_view),
                    strokeWidth: 3,
                    points: point_pos,
                    lineCap: 'round',
                    lineJoin: 'round',
                    dash: border(question, connect, is_view)
                });
                line_current.zIndex(3);
                line_current.on('mouseenter', function () {
                    stage.container().style.cursor = 'pointer';
                });

                line_current.on('mouseleave', function () {
                    stage.container().style.cursor = 'default';
                });


                line_current.on("mousedown", (e) => {
                    if (exam_status !== EXAM_STATUS.VIEW) {
                        const cx = stage.getPointerPosition()?.x;
                        const cy = stage.getPointerPosition()?.y;
                        // console.log({cx, cy})
                        if (e.target && cx && cy) {
                            const p_closest = getClosestPoint(
                                { x: cx, y: cy },
                                points
                            )
                            if (p_closest) {
                                is_drawing = true;
                                //@ts-ignore
                                line_current = e.target;
                                point_pos = e.target.getAttr("points");
                                // console.log("TARGET ", e.target)
                                // console.log("BEFORE: ",{ ...point_pos })
                                p_closest.is_selected = false;
                                line_connect_cur = getConnect(point_pos, points)
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
                                e.target.setAttr("points", point_pos)
                            }
                        }
                    }
                    // e.target.destroy()
                })
                layer.add(line_current);
            }
            stage.on('mousemove', () => {
                if (is_drawing && exam_status !== EXAM_STATUS.VIEW) {
                    const pos = stage.getPointerPosition();
                    if (pos?.x && pos?.y) {
                        point_pos[2] = pos.x;
                        point_pos[3] = pos.y
                    }
                    if (line_current) {
                        line_current.setAttrs({
                            points: point_pos
                        })
                    }
                }
            })

            stage.on('mouseup', (e) => {
                is_drawing = false;
                if (point_pos.length) {
                    const n_points = resetPoint(point_pos, points);
                    onDrawLine(line_connect_cur);
                    line_connect_cur = { src: '', dist: '' }
                    onDrawLine(getConnect(n_points, points))
                    e.target.setAttr("points", n_points)
                }
                point_pos = [];
            })

            const center_padding = Math.floor((container_width - Math.floor(item_num / 2) * (IMG_WIDTH + IMG_MARGIN + IMG_PADDING)) / 2);
            //@ts-ignore
            for (const [index, answer] of question.answers.entries()) {
                const imageObj = new Image();
                imageObj.onload = () => {
                    // if(index * 2 < item_num){
                    //     height_top = Math.max(height_top, IMG_HEIGHT)
                    // }

                    // if(index * 2 >= item_num){
                    //     height_bottom = Math.max(height_top, height_bottom)
                    // }

                    const dx = index * 2 < item_num
                        ? answer.pos * (IMG_WIDTH + IMG_MARGIN)
                        : (answer.pos - Math.floor(item_num / 2)) * (IMG_WIDTH + IMG_MARGIN);

                    const dy = index * 2 < item_num ? 0 : Math.floor(IMG_HEIGHT * 1.5);

                    const margin_left = center_padding
                        + (index * 2 < item_num
                            ? answer.pos * IMG_MARGIN
                            : (answer.pos - Math.floor(item_num / 2)) * IMG_MARGIN);

                    const margin_top = 20;

                    const image = new Konva.Image({
                        x: dx + Math.floor(IMG_PADDING / 2) + margin_left,
                        id: answer.id,
                        y: dy + Math.floor(IMG_PADDING / 2) + margin_top,
                        image: imageObj,
                        width: IMG_WIDTH,
                        height: IMG_HEIGHT,
                    });


                    const rec = new Konva.Rect({
                        stroke: 'orange',
                        x: dx + margin_left,
                        id: answer.id,
                        y: dy + margin_top,
                        width: (IMG_WIDTH + IMG_PADDING),
                        height: (IMG_HEIGHT + IMG_PADDING),
                        dash: border(question, connect, is_view),
                        cornerRadius: 10
                    });

                    const c_x = (index * 2 < item_num
                        ? Math.floor((answer.pos + 0.5) * (IMG_WIDTH + IMG_MARGIN))
                        : (answer.pos - Math.floor(item_num / 2) + 0.5) * (IMG_WIDTH + IMG_MARGIN)) + margin_left;
                    const c_y = margin_top + (index * 2 < item_num
                        ? IMG_HEIGHT + IMG_MARGIN
                        : Math.floor(IMG_HEIGHT * 1.5))
                    points.push({
                        x: c_x, y: c_y, is_up: index * 2 < item_num, id: answer.id
                    })
                    const circle = new Konva.Circle({
                        x: c_x,
                        id: answer.id,
                        y: c_y,
                        radius: RADIUS,
                        stroke: 'orange',
                        fill: 'white'
                    });

                    circle.on('mouseenter', function () {
                        stage.container().style.cursor = 'pointer';
                    });

                    circle.on('mouseleave', function () {
                        stage.container().style.cursor = 'default';
                    });

                    circle.on('mousedown', function (e) {
                        // console.log("MOUSE DOWN:", points)
                        const point_closest = getClosestPoint({
                            x: e.target.getAttr("x"), y: e.target.getAttr("y")
                        }, points)

                        if (point_closest && point_closest.is_selected) {
                            return;
                        }

                        is_drawing = true;
                        point_pos.push(c_x, c_y)
                        drawLine();
                    });

                    layer.add(rec);
                    layer.add(image);
                    layer.add(circle);
                    rects.push(rec);
                    // Render line answer pupil
                    if (points.length === question.answers.length) {
                        const ans = is_view ? question.solutions : question.answer_pupil;
                        for (const key of Object.keys(ans)) {
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
                                for(const rec of rects){
                                    const rec_id = rec.getAttr("id");
                                    if (rec_id === point_src.id || rec_id === point_dist.id){
                                        rec.setAttr("stroke", checkColor(question, connect, is_view))
                                        rec.setAttr("dash", border(question, connect, is_view))
                                    }
                                }
                                drawLine()
                                point_pos = [];
                                connect = '';
                            }
                        }
                        // resize container
                        // if(is_view){
                        //     console.log("VIEWED CH_007")
                        //     layer.setAttr("x", Math.floor(IMG_HEIGHT * 1.5) + IMG_HEIGHT)
                        // }
                        stage.setAttr("height", Math.floor(IMG_HEIGHT * 1.5) + IMG_HEIGHT + IMG_MARGIN + IMG_PADDING + margin_top)
                        layer.batchDraw();

                    }
                    
                }
                //@ts-ignore
                imageObj.src = answer.content[0].data
            }

            // console.log(points.length , question.answers.length)
            // while (points.length <= question.answers.length){
            //     console.log("FUCK")
            // }
        }

    }, [is_view, question.id]);

    return (
        <>
            <div id={`container-${question?.id}-${is_view ? 'view' : 'answer'}`}></div>
        </>
    )
}

export default ConnectImage