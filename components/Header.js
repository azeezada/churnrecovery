import Image from 'next/image'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={40} 
            height={40}
          />
          <span className={styles.name}>churn recovery</span>
        </div>
        <button className={styles.button}>let's chat</button>
      </div>
    </header>
  )
}
