import { footerSection } from '../../domain/sectionDomains'
import getData from '../firebase/dataService';
import getImage from '../firebase/imageService';

async function fetchFooter() {
  const a = await getData(footerSection.footer.hash)
  const b = await getImage(a[0][footerSection.footer.keys[0]].fullPath)

  return { a, b}  
}

export default fetchFooter;