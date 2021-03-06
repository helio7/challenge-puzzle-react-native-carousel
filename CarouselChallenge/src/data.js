// I know these imports look a bit repetitive, but I don't
// know how to better import the images. So for the purposes
// of this demo I think I'll let it this way.
import img_1_1 from '../assets/1_1.jpg';
import img_1_2 from '../assets/1_2.jpg';
import img_1_3 from '../assets/1_3.jpg';
import img_2_1 from '../assets/2_1.jpg';
import img_2_2 from '../assets/2_2.jpg';
import img_2_3 from '../assets/2_3.jpg';
import img_3_1 from '../assets/3_1.jpg';
import img_3_2 from '../assets/3_2.jpg';
import img_3_3 from '../assets/3_3.jpg';
import img_4_1 from '../assets/4_1.jpeg';
import img_4_2 from '../assets/4_2.jpg';
import img_4_3 from '../assets/4_3.jpg';
import img_5_1 from '../assets/5_1.jpg';
import img_5_2 from '../assets/5_2.jpg';
import img_5_3 from '../assets/5_3.jpg';

const carouselData = [
   {
     key: '1',
     title: 'First Block',
     images: [img_1_1, img_1_2, img_1_3]
   },
   {
     key: '2',
     title: 'Second Block',
     images: [img_2_1, img_2_2, img_2_3]
   },
   {
     key: '3',
     title: 'Third Block',
     images: [img_3_1, img_3_2, img_3_3]
   },
   {
     key: '4',
     title: 'Fourth Block',
     images: [img_4_1, img_4_2, img_4_3]
   },
   {
     key: '5',
     title: 'Fifth Block',
     images: [img_5_1, img_5_2, img_5_3]
   }
 ];

 export default carouselData;

import _placeholder_image from '../assets/icon.png';
export const placeholder_image = _placeholder_image;
