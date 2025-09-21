export default function CurvedNav({ options }) {
  return (
    <>
      <div class="top-nav-wrap">
        <nav class="curved-nav" role="navigation" aria-label="Primary">
        <ul id="nav-list" class="desktop-only" role="menubar">
            {options.map((option, index) => (
                <li role="none" key={index}><a role="menuitem" href={option.href}>{option.label}</a></li>
            ))}
        </ul>
        </nav>
      </div>
    </>
  );
}