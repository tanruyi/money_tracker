import styles from './Dashboard.module.css'

const Dashboard = () => {
  return (
      <div className={styles.dashboardContainer}>
          <div className={styles.dashboardChartContainer}>
              <h2 className={styles.dashboardChartHeader}>Income</h2>
          </div>
    </div>
  )
}

export default Dashboard