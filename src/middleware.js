//Nota: para que funcione el middleware es necesario configurar el
//NEXTAUTH_SECRET y no el AUTH_SECRET

//logica que se ejecutará antes de entrar a cualquier ruta, protegiendola.
export { default } from "next-auth/middleware";

//objeto de configuración que va a proteger las rutas que le indiquemos en matcher
export const config = {
  matcher: ["/dashboard/:path*", "/cursos/:path*"],
};
