import React from 'react';
import styles from './_Legend.module.scss';

export default function Legend() {
  return (
    <div className={ styles.container }>
      <p className={ styles.title}>Legend</p>
      <div className={ styles.main } >
        <div className={ styles.scale }></div>
        <div className={ styles.max_min }>
          <div>min</div>
          <div>max</div>
        </div>
      </div>
    </div>
  );
}
