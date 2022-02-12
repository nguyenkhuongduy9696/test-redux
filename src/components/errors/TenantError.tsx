const TenantError = () => {
  return (
    <>
      <div className='w-screen h-screen bg-green-500 flex justify-center items-center'>
        <div className="w-full flex items-center justify-center">
          <div className='text-2xl'>Oops!</div>
          <div className='flex-col justify-center items-center'>
            <p>Tài khoản không tồn tại hoặc chưa được kích hoạt</p>
            <p>Vui lòng liên hệ Hotline: 0902291318 để được hỗ trợ</p>
          </div>
        </div>

      </div>

    </>
  );
};

export default TenantError;
