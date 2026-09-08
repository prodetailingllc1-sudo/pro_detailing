export function SectionIntro({
  eyebrow,
  title,
  copy,
  align = 'left',
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={`section-intro section-intro-${align}`}>
      <p className="eyebrow">
        <span /> {eyebrow}
      </p>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}
