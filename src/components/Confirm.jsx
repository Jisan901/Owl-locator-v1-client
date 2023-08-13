function Confirm({onConfirm,onCancle,message}) {
    return (
        <dialog id="confirm_modal" className="modal modal-bottom sm:modal-middle">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Confirm</h3>
            <p className="py-4">{message}</p>
            <div className="modal-action">
              <button onClick={()=>onCancle()} className="btn btn-error">Close</button>
              <button onClick={()=>onConfirm()} className="btn btn-primary">Confirm</button>
            </div>
          </form>
        </dialog>
    )
}

export default Confirm;
