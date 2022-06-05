import logger from "../utils/logger.js";

/* -------------------------------------------------------------------------- */
/*                                   signup                                   */
/* -------------------------------------------------------------------------- */
export function postSignup(req, res) {
    const user = req.user;
    logger.info(`Post SignUp/${user}`);
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
    logger.info(`Post Login/${user}`);
    res.status(200).json(user);
}
  
export function failLogin(req, res) {
    logger.info(`Post Login/ Error en Login`);
    res.status(401).send('No Autorizado');
}
  
  /* -------------------------------------------------------------------------- */
  /*                                   logout                                   */
  /* -------------------------------------------------------------------------- */
  
export function logout(req, res) {
    logger.info(`Post Login/ Logut`);
    req.logout();
    res.status(401).send('No Autorizado');
}