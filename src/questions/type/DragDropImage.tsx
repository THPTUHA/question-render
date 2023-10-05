import Konva from 'konva';
import { useLayoutEffect } from 'react';
import { S_ANSWER_CORRECT } from 'question-convert';
import { QuestionRender } from 'question-convert';
import { EXAM_STATUS } from '../../constants';
import { onDragHorizontal } from '../types';


const DragDropImage = ({
    question,
    is_view,
    exam_status,
    onDragHorizontal,
}: {
    question: QuestionRender,
    is_view?: boolean,
    exam_status: number,
    onDragHorizontal: onDragHorizontal,
}) => {

    useLayoutEffect(() => {
        const container = document.querySelector('#stage-parent');
        const status = question.status;

        if (container) {

            //@ts-ignore
            const container_width = container.offsetWidth;
            const answer_number = question.answers.length;
            const IMG_WIDTH = answer_number <= 4
                ? Math.floor(container_width / (answer_number + answer_number / 2))
                : Math.floor(container_width / (answer_number + Math.round(answer_number / 2)));
            const IMG_HEIGHT = IMG_WIDTH;
            const IMG_PADDING = Math.floor(IMG_WIDTH / 5);
            const GROUP_MARGIN = IMG_PADDING;
            const GROUP_WIDTH = IMG_WIDTH + IMG_PADDING;
            const GROUP_HEIGHT = IMG_HEIGHT + IMG_PADDING;

            //@ts-ignore
            var stage = new Konva.Stage({
                container: `container-${question.id}-${is_view ? 'view' : 'answer'}`,
                width: container_width,
                height: GROUP_HEIGHT + Math.floor(GROUP_HEIGHT / 5),
            });
            var layer = new Konva.Layer();
            stage.add(layer);
            const groups: any[] = [];
            // var con = stage.container();
            let pos_x_drag = 0;
            let pre_pos = 0;
            //@ts-ignore
            let answers = [...question.answers]
            if (is_view) {
                answers.sort((a, b) => (a.id > b.id ? 1 : -1))
                console.log("VIEW CH_008", answers)
            }

            const tube_width = (GROUP_WIDTH + GROUP_MARGIN) * (question.answers.length - 1);
            const center_margin = Math.floor((container_width - GROUP_WIDTH * answer_number - GROUP_MARGIN * (answer_number - 1)) / 2);
            //@ts-ignore
            for (const [index, answer] of answers.entries()) {
                const imageObj = new Image();
                imageObj.onload = () => {
                    const image = new Konva.Image({
                        x: Math.floor(IMG_PADDING / 2),
                        id: answer.id,
                        y: Math.floor(IMG_PADDING / 2),
                        image: imageObj,
                        width: IMG_WIDTH,
                        height: IMG_HEIGHT,
                    });

                    const group = new Konva.Group({
                        id: answer.id,
                        x: center_margin + (is_view ? index * (GROUP_WIDTH + GROUP_MARGIN) : answer.pos * (GROUP_WIDTH + GROUP_MARGIN)),
                        y: 20,
                        width: GROUP_WIDTH,
                        height: GROUP_HEIGHT,
                        draggable: exam_status === EXAM_STATUS.VIEW ? false : true,

                        dragBoundFunc: function (pos) {
                            if ((pos.x > 0 && pre_pos && Math.abs(pos.x - pre_pos) < (IMG_WIDTH == 100 ? 60 : 80)) || pre_pos === 0) {
                                for (let _group of groups) {
                                    const { x, id } = _group.attrs;
                                    const limit_right = x + GROUP_WIDTH;

                                    if (id !== this.attrs.id) {
                                        // console.log("VALUES: ", x, id, this.attrs.x, IMG_WIDTH)
                                        if (pos.x < limit_right && pos.x > x && 2 * (pos.x - x) < GROUP_WIDTH) {
                                            console.log("OFFSET RIGHT: ", {
                                                id: id,
                                                my_x: this.attrs.x,
                                                x: x,
                                                pos_x: pos.x
                                            })
                                            pos_x_drag -= (GROUP_WIDTH + GROUP_MARGIN);
                                            _group.setAttr('x', x + (GROUP_WIDTH + GROUP_MARGIN));
                                            onDragHorizontal(id, false)
                                            break;
                                        }

                                        if (pos.x + GROUP_WIDTH < limit_right && pos.x + GROUP_WIDTH > x &&
                                            2 * (pos.x + GROUP_WIDTH - x) > GROUP_WIDTH) {
                                            console.log("OFFSET LEFT: ", {
                                                id: id,
                                                my_x: this.attrs.x,
                                                x: x,
                                                pos_x: pos.x
                                            })
                                            pos_x_drag += (GROUP_WIDTH + GROUP_MARGIN);
                                            _group.setAttr('x', x - (GROUP_WIDTH + GROUP_MARGIN));
                                            onDragHorizontal(id, true);
                                            break;
                                        }
                                    }
                                }

                                pre_pos = pos.x
                            }
                            return {
                                x: pos.x < center_margin ? center_margin : pos.x > center_margin + tube_width ? center_margin + tube_width : pos.x,
                                y: this.absolutePosition().y,
                            };
                        },
                    });

                    groups.push(group);
                    if (groups.length === question.answers.length) {
                        for (let g of groups) {
                            console.log("X : " + g.getAttr("x") + " ID: " + g.getAttr("id"))
                        }
                    }
                    group.on('mouseenter', function () {
                        stage.container().style.cursor = 'pointer';
                    });

                    group.on('mouseleave', function () {
                        // console.log("LEAVE ID", e.target.attrs.id)
                        stage.container().style.cursor = 'default';
                    });

                    group.on('dragstart', function (e) {
                        // console.log("DRAGSTART ID", pos_x_drag)
                        e.target.setZIndex(3);
                        pos_x_drag = this.attrs.x;
                    });

                    group.on('dragend', function (e) {
                        // console.log("DRAGEND ID", pos_x_drag)
                        console.log("DRAG END:", pos_x_drag);
                        pre_pos = 0;
                        this.setAttr('x', pos_x_drag)
                        e.target.setZIndex(0);
                    });

                    group.add(new Konva.Rect({
                        width: IMG_WIDTH + IMG_PADDING,
                        height: IMG_HEIGHT + IMG_PADDING,
                        // fill: 'lightblue',
                        stroke: is_view ? 'orange' : status === S_ANSWER_CORRECT ? 'green' : status ? 'red' : 'orange',
                        dash: [5, 5, 5, 5]
                    }));

                    group.add(image);
                    // add the shape to the layer
                    layer.add(group);
                    layer.batchDraw();

                }
                //@ts-ignore
                imageObj.src = answer.content[0].data
            }

        }

    }, [question.id]);

    return (
        <>
            <div id={`container-${question.id}-${is_view ? 'view' : 'answer'}`}></div>
        </>
    )
}

export default DragDropImage