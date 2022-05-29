/* -------------------------------------------------------------------------- */
/*                                   signup                                   */
/* -------------------------------------------------------------------------- */


export function postSignup(req, res) {
    const user = req.user;
    console.log(user);
    res.status(200).json(user);
}
  
export function failSignup(req, res) {
    res.status(401).send('No Autorizado');
}
  
  /* -------------------------------------------------------------------------- */
  /*                                    login                                   */
  /* -------------------------------------------------------------------------- */
  
export function postLogin(req, res) {
    const user = req.user;
    console.log(user);
    res.status(200).json(user);
}
  
export function failLogin(req, res) {
    console.log("Error en el login");
    res.status(401).send('No Autorizado');
}
  
  /* -------------------------------------------------------------------------- */
  /*                                   logout                                   */
  /* -------------------------------------------------------------------------- */
  
export function logout(req, res) {
    console.log("logout");
    req.logout();
    res.status(401).send('No Autorizado');
}