import { getCookies, setCookie } from "cookies-next";
import { useAlertState } from "store/store";

const Alert = () => {
  const alert = useAlertState();
  const { type, "list-alert-state": listAlertState, "blob-alert-state": blobAlertState } = getCookies();

  return (
    <>
      {alert.show && type && (type === "list" ? listAlertState !== "closed" : blobAlertState !== "closed") && (
        <div
          className={`alert alert-${alert.type} flex items-center justify-center p-1 text-center text-white`}
          role={"alert"}
        >
          <span className="hover:text-underline inline-block p-1">{alert.message}</span>
          <button
            type="button"
            className="absolute right-4"
            onClick={() => {
              alert.setShow(false);
              setCookie(`${type}-alert-state`, "closed", { maxAge: 60 * 60 * 10 });
            }}
            aria-label="Close"
          >
            <svg viewBox="0 0 15 15" width={14} height={14}>
              <g stroke="currentColor" strokeWidth="3.1">
                <path d="M.75.75l13.5 13.5M14.25.75L.75 14.25" />
              </g>
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default Alert;
