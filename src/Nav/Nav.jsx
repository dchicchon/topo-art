import React, { useEffect, useRef, useState } from 'react';
import { SketchPicker } from 'react-color'
import './Nav.css'

const Widget = ({ type, lineColor, landColor, lineWidth, handleColorChange, setLineWidth }) => {
    if (type === 'landColor') {
        return (
            <div className='option-widget' style={{ display: 'block' }}>
                <h4>Land Color</h4>
                <SketchPicker color={landColor} onChangeComplete={(color) => handleColorChange(color, 'land-color')} />
            </div>
        )
    }
    if (type === 'lineColor') {
        return (
            <div className='option-widget' style={{ display: 'block' }}>
                <h4>Line Color</h4>
                <SketchPicker color={lineColor} onChangeComplete={(color) => handleColorChange(color, 'line-color')} />
            </div>
        )
    }
    if (type === 'lineWidth') {
        return (
            <div className='option-widget' style={{ display: 'block' }}>
                <h4>Line Width</h4>
                <input onChange={e => setLineWidth(parseFloat(e.target.value))} value={lineWidth} type='range' min='0.5' max='1.5' step='0.1' />
            </div>
        )
    }
    return (
        <div style={{ display: 'none' }}></div>
    )
}

const Nav = ({ setPlaces, setLineWidth, setContours, setLineColor, setLandColor, map, landColor, lineColor }) => {
    const docs = useRef(null)
    const options = useRef(null)
    const [currentWidget, setCurrentWidget] = useState('')

    useEffect((prevWidget) => {
        console.log(prevWidget)
    }, [currentWidget])

    const setCurrentWidgetWrapper = (type) => {
        setCurrentWidget((prevProps) => {
            if (type !== prevProps) {
                return type;
            }
            return ''
        })
    }
    const toggleDocs = (e) => {
        if (docs.current.style.maxHeight === '0px' || !docs.current.style.maxHeight) {
            return docs.current.style.maxHeight = '500px'
        }
        docs.current.style.maxHeight = '0px'
    }
    const toggleOptions = (e) => {
        if (options.current.style.maxHeight === '0px' || !options.current.style.maxHeight) {
            return options.current.style.maxHeight = '500px'
        }
        setCurrentWidget('');
        options.current.style.maxHeight = '0px'
    }
    const togglePlaces = (e) => setPlaces(prevState => !prevState)

    const toggleContours = (e) => setContours(prevState => !prevState)

    const handleColorChange = (color, property) => {
        switch (property) {
            case 'line-color':
                setLineColor(color.hex)
                break;
            case 'land-color':
                setLandColor(color.hex)
                break;
        }
    }
    const takePhoto = (e) => {
        // access map and get the dataurl
        let img = map.getCanvas().toDataURL();
        console.log(img);
        var download = document.createElement('a')
        download.href = img
        download.target = '_blank'
        download.download = 'map'
        let evt = document.createEvent('MouseEvents')
        evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0,
            false, false, false, false, 0, null);
        download.dispatchEvent(evt);

    }

    return (
        <div id='topo-nav'>
            <div id='nav-panel'>
                <h2 id='title'>TOPO</h2>
                <ul id='nav-list'>
                    <li onClick={toggleDocs}>Documentation</li>
                    <li ref={docs} id='docs-container'>
                        <p>Welcome to Topo! This is a map where you can create photos of
                            contours on maps and edit the contour line colors and land color.
                            Try editing this map using the options button below!</p>
                    </li>
                    <li onClick={toggleOptions}>Options</li>
                    <li ref={options} id='option-container'>
                        <ul id='option-list'>
                            <li onClick={() => setCurrentWidgetWrapper('landColor')}>Land Color</li>
                            <li onClick={() => setCurrentWidgetWrapper('lineColor')}>Contour Line Color</li>
                            <li onClick={() => setCurrentWidgetWrapper('lineWidth')}>Contour Line Width</li>
                            <li onClick={toggleContours}>Toggle Contours</li>
                            <li onClick={togglePlaces}>Toggle Places</li>
                        </ul>
                    </li>
                    <li onClick={takePhoto}>Download Map</li>
                </ul>
            </div>
            <div id='nav-widgets'>
                <Widget
                    type={currentWidget}
                    landColor={landColor}
                    lineColor={lineColor}
                    handleColorChange={handleColorChange}
                    setLineWidth={setLineWidth}
                />
            </div>
        </div >
    )
}

export default Nav