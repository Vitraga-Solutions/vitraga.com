import keras from '../assets/logo/keras.svg';
import python from '../assets/logo/python.svg';
import tensorflow from '../assets/logo/tensorflow.svg';

type LogoItem = {
  src: ImageMetadata;
  alt: string;
};

const Logo: Record<string, LogoItem> = {
  keras: {
    src: keras,
    alt: 'Keras',
  },
  python: {
    src: python,
    alt: 'Python',
  },
  tensorflow: {
    src: tensorflow,
    alt: 'TensorFlow',
  },
};

export default Logo;