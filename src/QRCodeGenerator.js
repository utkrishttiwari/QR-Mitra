import { QRCodeCanvas } from 'qrcode.react';
import React, { useRef, useState } from 'react'

const QRCodeGenerator = () => {

    const [text, setText] = useState('');

    const qrRef = useRef();

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

    const downloadQRCode = () => {
        const canvas = qrRef.current.querySelector('canvas');
        
        if(canvas) {
            const url = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = url;
            link.download = "qrcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
  return (
    <>
        <div className='qrwrap'>
            <div className='qrInner'>
                <h2>Generate QR Code</h2>
                
                <input type='text' className={text && !isValidInput(text) ? 'error' : ''} value={text} onChange={(e)=> setText(e.target.value)} placeholder='Enter Text or URL' />

                {text && !isValidInput(text) && (
                    <p className='errorMsg'>Invalid Input ! Avoid special characters.</p>
                )}



                <div ref={qrRef}>
                    {isValidInput(text) &&  
                        <div className='qrcode'>
                            <QRCodeCanvas value={text} size={200} fgColor="#000" />
                            <button type='button' onClick={downloadQRCode} className='downloadBtn'>Download QR Code</button>
                        </div>
                    }
                </div>
            </div>
        </div>

        {/* https://qrcrib.com/ */}
    </>
  )
}

export default QRCodeGenerator