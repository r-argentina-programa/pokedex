export default function obtenerParametrosDeURL(url) {
  let offset;
  let limit;
  try {
    offset = /offset=([0-9]+)/gi.exec(url).pop();
    limit = /limit=([0-9]+)/gi.exec(url).pop();
  } catch (e) {
    offset = undefined;
    limit = undefined;
  }
  return { offset, limit };
}
