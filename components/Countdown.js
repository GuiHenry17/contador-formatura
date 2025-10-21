import { useEffect, useState } from "react" 
import styles from "../styles/countdown.module.css" 

export default function Countdown({ targetDate, onFinished }) {
  const [isClient, setIsClient] = useState(false) 

  useEffect(() => {
    setIsClient(true) 
  }, []) 

  function getTimeLeft() {
    const now = new Date() 
    const diff = targetDate - now 

    if (diff <= 0)
      return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 } 

    const SECOND = 1000 
    const MINUTE = SECOND * 60 
    const HOUR = MINUTE * 60 
    const DAY = HOUR * 24 

    const days = Math.floor(diff / DAY) 
    const hours = Math.floor((diff % DAY) / HOUR) 
    const minutes = Math.floor((diff % HOUR) / MINUTE) 
    const seconds = Math.floor((diff % MINUTE) / SECOND) 

    return { total: diff, days, hours, minutes, seconds } 
  }

  const [timeLeft, setTimeLeft] = useState(getTimeLeft()) 

  useEffect(() => {
    if (!isClient) return 

    const timer = setInterval(() => {
      const tl = getTimeLeft() 
      setTimeLeft(tl) 
      if (tl.total <= 0) {
        clearInterval(timer) 
        if (onFinished) onFinished() 
      }
    }, 1000) 

    return () => clearInterval(timer) 
  }, [isClient]) 

  if (!isClient) return null 

  return (
    <div className={styles.countdown}>
      
      <div className={styles.timeGrid}>
        
        <div className={styles.timeCard}>
          
          <div className={styles.timeValue}>{timeLeft.days}</div>
          <div className={styles.timeLabel}>Dias</div>
        </div>
        <div className={styles.timeCard}>
          
          <div className={styles.timeValue}>
            {String(timeLeft.hours).padStart(2, "0")}
          </div>
          <div className={styles.timeLabel}>Horas</div>
        </div>
        <div className={styles.timeCard}>
          
          <div className={styles.timeValue}>
            {String(timeLeft.minutes).padStart(2, "0")}
          </div>
          <div className={styles.timeLabel}>Minutos</div>
        </div>
        <div className={styles.timeCard}>
          
          <div className={styles.timeValue}>
            {String(timeLeft.seconds).padStart(2, "0")}
          </div>
          <div className={styles.timeLabel}>Segundos</div>
        </div>
      </div>
    </div>
  ) 
}
