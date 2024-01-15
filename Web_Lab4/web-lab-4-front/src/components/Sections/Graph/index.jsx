import {useEffect, useRef} from "react";

const xAxisLabel = "X";
const yAxisLabel = "Y";

const Graph = (
    {width, height, minX, maxX, minY, maxY, radius, items, onClickChart}
) => {
    const canvasRef = useRef(null)

    // Dimensions
    const getWidth = () => { return width }
    const getHeight = () => { return height }
    const getScaleFactorX = () => { return getWidth() / (maxX - minX) }
    const getScaleFactorY = () => { return getHeight() / (maxY - minY)}

    // Position Extracting
    const getCursorPosition = (event) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        return { x: x, y: y };
    }

    // Coordinate - Position Converting
    const positionToCoordinate = (position) => {
        const offsetX = position.x / getScaleFactorX();
        const offsetY = position.y / getScaleFactorY();
        const x = minX + offsetX;
        const y = maxY - offsetY;
        return { x: x, y: y };
    }

    const coordinateToPosition = (coordinate) => {
        const offsetX = coordinate.x - minX;
        const offsetY = maxY - coordinate.y;
        const x = offsetX * getScaleFactorX();
        const y = offsetY * getScaleFactorY();
        return { x: x, y: y };
    }

    // Drawing
    const clearCanvas = (context) => {
        context.clearRect(0, 0, getWidth(), getWidth())
    }
    function axesToCanvasCoordinates(xAxes, yAxes, canvas) {
        let originX = canvas.width / 2;
        let originY = canvas.height / 2;

        let canvasX = originX + xAxes;
        let canvasY = originY - yAxes;

        return { x: canvasX, y: canvasY };
    }

    function canvasToAxesCoordinates(xCanvas, yCanvas, canvas){
        let originX = canvas.width / 2;
        let originY = canvas.height / 2;

        let x = (xCanvas - originX)/getScaleFactorX();
        let y = (originY - yCanvas)/getScaleFactorY();

        return {x, y};
    }

    function rescaleXAxesCoordinate(coordinate) {
        return (coordinate / getScaleFactorX());
    }
    function rescaleYAxesCoordinate(coordinate) {
        return coordinate / getScaleFactorY();
    }

    const drawBoard = (context, canvas) => {
        context.strokeStyle = '#000'
        context.beginPath();
        context.lineWidth = 0.5;
        for (let x = getScaleFactorX(); x < getWidth(); x += getScaleFactorX()) {
            context.moveTo(x, 0);
            context.lineTo(x, getHeight());
        }
        for (let y = getScaleFactorY(); y < getHeight(); y += getScaleFactorY()) {
            context.moveTo(0, y);
            context.lineTo(getWidth(), y);
        }
        context.stroke();


        context.lineWidth = 2;
        context.strokeStyle = 'black';

        // y axis
        context.beginPath();
        context.moveTo(getWidth() / 2, 2);
        context.lineTo(getWidth() / 2 - 10, 15);
        context.moveTo(getWidth() / 2, 2);
        context.lineTo(getWidth() / 2 + 10, 15);
        context.moveTo(getWidth() / 2, 2);
        context.lineTo(getWidth() / 2, getHeight());
        context.stroke();
        context.closePath();

        // x axis
        context.beginPath();
        context.moveTo(getWidth() - 2, getHeight() / 2);
        context.lineTo(getWidth() - 15, getHeight() / 2 - 10);
        context.moveTo(getWidth() - 2, getHeight() / 2);
        context.lineTo(getWidth() - 15, getHeight() / 2 + 10);
        context.moveTo(getWidth() - 2, getHeight() / 2);
        context.lineTo(0, getHeight() / 2);
        context.stroke();
        context.closePath();

        context.fontFamily = "Open Sans, sans-serif";
        let fontArgs = context.font.split(' ');
        let newSize = '10px';
        context.font = newSize + ' ' + fontArgs[fontArgs.length - 1];
        context.fillStyle = "rgb(0,0,0)"
        context.fillText(xAxisLabel, canvas.width - 25, canvas.height / 2 - 8);
        context.fillText(yAxisLabel, canvas.width / 2 + 10, 15);

        // Draw scale markings on the axes
        for (let i = -canvas.width / 2; i < canvas.width / 2; i += getScaleFactorX()) {
            let scalePos = axesToCanvasCoordinates(i, 0, canvas);
            context.beginPath();
            context.moveTo(scalePos.x, scalePos.y - 5);
            context.lineTo(scalePos.x, scalePos.y + 5);
            context.stroke();
            context.fillText(rescaleXAxesCoordinate(i), scalePos.x - 10, scalePos.y + 20);
        }

        for (let j = -canvas.height / 2; j < canvas.height / 2; j += getScaleFactorY()) {
            let scalePos = axesToCanvasCoordinates(0, j, canvas);
            context.beginPath();
            context.moveTo(scalePos.x - 5, scalePos.y);
            context.lineTo(scalePos.x + 5, scalePos.y);
            context.stroke();
            context.fillText(rescaleYAxesCoordinate(j), scalePos.x + 10, scalePos.y + 5);
        }
    }
    function batman_upper(x) {
        x = Math.abs(x);
        if (x < 0.5) {
            return 2.25;
        } else if (0.5 <= x && x < 0.75) {
            return (3 * x + 0.75);
        } else if (0.75 <= x && x < 1.0) {
            return (9 - 8 * x);
        } else if (1 <= x && x < 3) {
            return (1.5 - 0.5 * x - 3 * Math.sqrt(10) / 7 * (Math.sqrt(3 - x ** 2 + 2 * x) - 2));
        } else if (3 <= x && x <= 7) {
            return 3 * Math.sqrt(-((x / 7) ** 2) + 1);
        }
    }

    function batman_lower(x) {
        x = Math.abs(x);
        if (0 <= x && x < 4) {
            return (Math.abs(x / 2) - (3 * Math.sqrt(33) - 7) / 112 * x ** 2 +
                Math.sqrt(1 - (Math.abs(x - 2) - 1) ** 2) - 3);
        } else if (4 <= x && x <= 7) {
            return -3 * Math.sqrt(-((x / 7) ** 2) + 1);
        }
    }

    const xValues = Array.from({ length: 7*100*2 }, (_, i) => -7 + (i / 100));
    const yUpperValues = xValues.map(batman_upper);
    const yLowerValues = xValues.map(batman_lower);
    const xyMax = 8.8;

    const drawShape = (context, radius) => {
        context.beginPath();
        context.moveTo(canvasRef.current.width / 12 * (6-radius), canvasRef.current.height / 2);
        context.lineWidth = 2

        for (let i = 0; i < xValues.length; i++) {
            const x = (xValues[i]/4.76*radius + xyMax) / (2 * xyMax) * canvasRef.current.width;
            const y = (1 - (yUpperValues[i]*radius/4.76 + xyMax) / (2 * xyMax)) * canvasRef.current.height;
            context.lineTo(x, y);
        }

        for (let i = xValues.length - 1; i >= 0; i--) {
            const x = (xValues[i]/4.76*radius + xyMax) / (2 * xyMax) * canvasRef.current.width;
            const y = (1 - (yLowerValues[i]*radius/4.76 + xyMax) / (2 * xyMax)) * canvasRef.current.height;
            context.lineTo(x, y);
        }
        context.fillStyle = '#236BF155'
        context.fill();
        context.strokeStyle = '#3E23F1'
        context.stroke();
        context.closePath();
        context.lineWidth = 1;

    }


    const drawItems = (context, items) => {
        context.beginPath()
        items.forEach(item => {
            if (item.r === radius) {
                const position = coordinateToPosition(item)
                const psize = 3
                context.fillStyle = item.status ? "rgb(340,0,235)" : "rgb(0,100,100)"
                context.beginPath()
                context.arc(position.x, position.y, psize, 0, 2 * Math.PI)
                context.fill()
                context.closePath()
            }
        })
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        clearCanvas(context)
        drawBoard(context, canvas)
        drawShape(context, radius)
        drawItems(context, items, radius)
    }, [width, height, minX, maxX, minY, maxY, radius, items])

    const handleOnClick = (event) => {
        const position = getCursorPosition(event)
        const coordinate = positionToCoordinate(position)
        onClickChart(coordinate)
    }


    return <canvas
        width={width}
        height={height}
        ref={canvasRef}
        onClick={handleOnClick}
    />
}
export default Graph;