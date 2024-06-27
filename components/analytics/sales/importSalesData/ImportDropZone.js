export default function ImportDropZone({ selectedTemplate, handleChange }) {
  if (!selectedTemplate) return;

  return (
    <div className="mt-3">
      <p>
        Download this{" "}
        <a
          href={selectedTemplate ? selectedTemplate?.file : ""}
          download
          className="font-medium text-blue-500"
        >
          template
        </a>{" "}
        and upload it here after filling the data.
      </p>
      <div className="mt-8">
        <input type="file" onChange={handleChange} />
      </div>
    </div>
  );
}
