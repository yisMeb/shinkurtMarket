import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function Subscribe() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const HandlepayChapa=async(birr)=>{
    return navigate('/chapa', {state: { birr }, replace: true });
  }

return (
    <>
      <div className='content-margin-overlap'>
        <h1>{t('Choose Your Subscription Plan')}</h1>
        <div className='row'>
          <div className='col-md-4'>
            <div className='card w-100 h-100 shadow-lg p-3 mb-5 rounded border-0'>
              <div className='card-body'>
                <h5 className='card-title'>{t('Basic')}</h5>
                <h6 className='card-subtitle mb-2 text-muted'>{t('$9.99/month')}</h6>
                <p className='card-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <button className='btn btn-primary' onClick={()=>{HandlepayChapa(499)}}>{t('Subscribe')}</button>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='card w-100 h-100 shadow-lg p-3 mb-5 rounded border-0'>
              <div className='card-body'>
                <h5 className='card-title'>{t('Standard')}</h5>
                <h6 className='card-subtitle mb-2 text-muted'>{t('$19.99/month')}</h6>
                <p className='card-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <button className='btn btn-primary' onClick={()=>{HandlepayChapa(1020)}}>{t('Subscribe')}</button>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='card w-100 h-100 shadow-lg p-3 mb-5 rounded border-0'>
              <div className='card-body'>
                <h5 className='card-title'>{t('Premium')}</h5>
                <h6 className='card-subtitle mb-2 text-muted'>{t('$29.99/month')}</h6>
                <p className='card-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <button className='btn btn-primary'  onClick={()=>{HandlepayChapa(1050)}}>{t('Subscribe')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Subscribe;
