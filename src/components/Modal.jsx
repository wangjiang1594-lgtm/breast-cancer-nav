// 通用居中弹窗
export default function Modal({ open, onClose, children, title }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-5 shadow-xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="mb-3 flex items-start justify-between">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <button className="ml-3 text-2xl leading-none text-gray-400" onClick={onClose}>
              ×
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
