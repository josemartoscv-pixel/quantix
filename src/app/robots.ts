import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/login", "/register"],
        disallow: [
          "/dashboard",
          "/transacciones",
          "/presupuesto",
          "/ahorros",
          "/deudas",
          "/calculadoras",
          "/patrimonio",
          "/cuentas",
          "/reportes",
          "/perfil",
          "/api/",
        ],
      },
    ],
    sitemap: "https://www.dineroyahorro.com/sitemap.xml",
  };
}
