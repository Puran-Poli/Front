export default function ModalTitle({ title }) {
  return (
    <>
      {title && (
        <h2 className="mb-6 flex items-center gap-2 px-6 text-xl font-medium leading-6 text-slate-700">
          {title}
        </h2>
      )}
      <hr />
    </>
  );
}
