import { Image } from "react-konva";
import useImage from 'use-image';

const ImageShape = ({ x, y, src}:{
    x: number,y: number, src: string
})=>{

    const [image] = useImage(src)
    
    return (
        <Image
            x={image?.width ? image?.width * x : x }
            y={image?.height ? image?.height * y : y}
            image={image}
            // ref={(node) => {
            //     this.imageNode = node;
            // }}
            children={<div>
                Hello
            </div>}
        />
    )
}

export default ImageShape