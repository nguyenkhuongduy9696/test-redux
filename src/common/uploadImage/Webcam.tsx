import React, { useCallback, useRef, useState } from 'react';

import { Dialog } from '@progress/kendo-react-dialogs';
import BaseButton from 'common/BaseButton';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import Webcam from 'react-webcam';
import { commonService } from 'services/commonService';

interface propTypes {
  onClose: any,
  setImage: any
}

const WebcamScreen = ({ onClose, setImage }: propTypes) => {
  const ref = useRef(null);
  const refWebcam = useRef<any>(null);
  const [imgSrc, setImgSrc] = useState<any>('');

  const uploadMutation = useMutation(image => commonService().uploadImage(image));

  const capture = useCallback(async () => {
    const imgScreen = refWebcam.current.getScreenshot();
    await setImgSrc(imgScreen);
  }, [refWebcam, setImgSrc]);

  const chooseImage = () => {
    uploadMutation.mutate(imgSrc, {
      onSuccess: async (res: any) => {
        await setImage(res.cdn_image);
        onClose();
      },
      onError: () => {
        toast.error('Lưu ảnh lên máy chủ thất bại, vui lòng thử lại sau');
      }
    });
  };

  const reCapture = () => {
    setImgSrc('');
  };

  return (
    <>
      <div ref={ ref }>
        <Dialog title='Chụp từ Webcam' onClose={ onClose } width={ 450 } appendTo={ ref.current }>
          {
            imgSrc === ''
              ? <div className="w-full py-4 px-8">
                <div className="webcam-screen">
                  <Webcam ref={ refWebcam }
                    audio={ false }
                    width={ 300 }
                    height={ 300 }
                    screenshotFormat='image/jpeg'
                    videoConstraints={ { width: 300, height: 300, facingMode: 'user' } }
                  />
                </div>
                <div className="md:flex justify-end mx-auto mt-2" >
                  <BaseButton title='Chụp ảnh' iconLeft='camera'
                    className="btn-gray"
                    onClick={ capture } />
                </div>
              </div>
              : <div className="w-full py-4 px-8">
                <div className="webcam-screen">
                  <img src={ imgSrc } alt="" className='mx-auto rounded-md'/>
                </div>
                <div className="md:flex justify-end mx-auto mt-2">
                  <BaseButton title='Chọn ảnh' iconLeft='check'
                    className="btn-gray"
                    onClick={ chooseImage } />
                  <BaseButton title='Chụp lại' iconLeft='times'
                    className="btn-gray ml-2"
                    onClick={ reCapture } />
                </div>
              </div>
          }
        </Dialog>
      </div>
    </>
  );
};

export default WebcamScreen;
