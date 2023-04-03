import styles from '@/styles/Home.module.css'


export default function Home({ handleLoginChange, handleLogin}) {
  // handleLoginChange resets username once submitted
  // handleLogin redirects to /chat component
  return (
      <div className={styles.main}>
        <form onSubmit={handleLogin}>
          <input className='border-2 border-black' type="text" placeholder='enter username...' onChange={handleLoginChange}/>
          <button>Submit</button> 
        </form>
      </div>
  )
}
