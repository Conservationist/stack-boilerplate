export default function() {
  if (process.env.NODE_ENV === 'production') {
    return 'js';
  } else {
    return 'ts';
  }
}
