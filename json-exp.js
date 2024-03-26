function jsonError() {
  let json = "{ bad json }";

  try {
    let user = JSON.parse(json); // <-- when an error occurs...
  } catch (err) {
    throw err
  }
  console.log('got to here') // doesn't print if the error is thrown.
  // So I guess throwing an error is an early return.
}

try {
  jsonError()
} catch (err) {
  console.log(err.message)
}
