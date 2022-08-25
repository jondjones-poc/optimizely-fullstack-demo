import styles from './Highlights.module.css';

export default function Highlights({id, className, title, subtitle, highlights, background}) {



  return (
    <section id={p.id} className={className} >
      <div className={styles.header}>
        <h2 className={styles.title}>{p.title}</h2>
        <p className={styles.subtitle}>{p.subtitle}</p>
      </div>

      <ul className={styles.highlights}>
        {p.highlights.map((item, i) => {
          return (
            <li key={i} className={styles.highlight}>
              <div className={styles['highlight-illustration']}/>
              <div className={styles['highlight-content']}>
                <h3 className={styles['highlight-title']}>{item.title}</h3>
                <p className={styles['highlight-text']}>{item.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}