import { Dispatch, SetStateAction } from "react";

function NotesModal({
  setShowModal,
  noteData,
  noteName,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  noteData: string;
  noteName: string;
}) {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden outline-none focus:outline-none">
        <div className="relative mx-auto my-6 w-auto max-w-[90vw]">
          {/*content*/}
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
              <h3 className="text-3xl font-semibold">
                {noteName.slice(0, -4)}
              </h3>
              <button
                className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none"></span>
              </button>
            </div>
            {/*body*/}
            <div className="relative flex-auto p-6">
              <p className="text-blueGray-500 my-4 text-lg leading-relaxed">
                <ul className="list-disc">
                  {noteData.split("|").map((point) => {
                    if (point.length === 0) {
                      return;
                    }
                    return <li className="mx-10 mt-5 text-base">{point}</li>;
                  })}
                </ul>
              </p>
            </div>
            {/*footer*/}
            <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
              <button
                className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
}

export default NotesModal;
