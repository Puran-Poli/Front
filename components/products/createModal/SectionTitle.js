export default function SectionTitle({ title }) {
  return (
    <>
      {title && (
        <h2 className="mb-8 border-b pb-2 text-lg font-medium tracking-wide text-slate-700">
          {title}
        </h2>
      )}
    </>
  );
}
