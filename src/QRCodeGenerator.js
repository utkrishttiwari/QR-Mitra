import { QRCodeCanvas } from 'qrcode.react';
import React, { useRef, useState } from 'react'

const QRCodeGenerator = () => {

    const [text, setText] = useState('');
    const [logo, setLogo] = useState(null);
    const [qrColor, setQrColor] = useState("#000000");
    const [fileName, setFileName] = useState('');

    const qrRef = useRef();

    const colorPalette = [ "#4285F4", "#1877F2", "#1DA1F2", "#C13584", "#25D366", "#FF0000", "#E82127", "#FF9900", "#0077B5" ];

    const isValidInput = (input) => {
        const trimmedInput = String(input)?.trim();
        const specialCharPattern = /[~`!@#$%^&*()_+={}\[\]:;"'<>,?/|\\]/;
        return (
            trimmedInput !== "" &&
            trimmedInput !== "." &&
            trimmedInput !== "," &&
            !specialCharPattern.test(trimmedInput)
        );
    }

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setLogo(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const downloadQRCode = () => {
        const canvas = qrRef.current.querySelector('canvas');
        
        if(canvas) {
            const url = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = url;

            const finalFileName = fileName.trim() !== "" ? `${fileName}.png` : 'qrcode.png';
            link.download = finalFileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
  return (
    <>

        <header className="header">
            <h1>Your home for QR creation & customization</h1>
            <p>Create customized QR codes with logos and colors</p>
        </header>

        <div className='qrwrap'>
            <div className='qrInner'>
                <input type='text' className={text && !isValidInput(text) ? 'error' : ''} value={text} onChange={(e)=> setText(e.target.value)} placeholder='Enter Text or URL' />
                <input type='text' value={fileName} onChange={(e) => setFileName(e.target.value)} placeholder='File name (optional)' />
                
                {text && !isValidInput(text) && (
                    <p className='errorMsg'>Invalid Input ! Avoid special characters.</p>
                )}

                <input type='file' accept='image/*' onChange={handleLogoUpload} />
                <div className="colorPalette">
                    {colorPalette.map((color) => (
                        <button
                        key={color}
                        className="colorBtn"
                        style={{
                            backgroundColor: color,
                        }}
                        onClick={() => setQrColor(color)}
                        ></button>
                    ))}
                </div>

                <div ref={qrRef}> 
                    <div className='qrcode'>
                        <QRCodeCanvas size={150} fgColor={qrColor}
                            value={isValidInput(text) ? text : "Welcome to QR Code"}
                            imageSettings={{
                                src: logo,
                                x: undefined,
                                y: undefined,
                                height: 50,
                                width: 50,
                                excavate: true,
                            }} />
                    </div>
                    <button type='button' onClick={downloadQRCode} className='downloadBtn' disabled={`${!isValidInput(text) ? 'disabled' : ''}`}>Download QR Code</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default QRCodeGenerator