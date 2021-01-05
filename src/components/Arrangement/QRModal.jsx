import React from 'react';
import QRCode from 'qrcode.react';

// Pop-up modal som generere QR-kode
const QRModal = ({ url }) => (
  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">QR-kode</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="mt-2">Del og benytt denne QR-koden for å komme direkte til arrangementets registreringsskjema</div>
        <div className="modal-body mb-3">
          <QRCode
            value={url}
            size="300"
          />
        </div>
      </div>
    </div>
  </div>
);

export default QRModal;
