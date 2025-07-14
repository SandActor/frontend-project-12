import { createRoot } from 'react-dom/client'
import './i18n'
import AppProviders from './AppProviders'

createRoot(document.getElementById('root')).render(<AppProviders />)
