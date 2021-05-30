export default function Definition({ definition, onUpdate }) {

  return (
    <code>
      {JSON.stringify(definition, null, 2)}
    </code>
  );
}