import React from "react"
import { Path } from "common/routing/Routing"
import { Link } from "react-router"
import { Button } from "@mui/material"
import s from "common/components/Page404/Page404.module.css"

export const Faq = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>FAQ</h1>
      <h2 className={s.subTitle}>page under construction</h2>
      <Button variant={"contained"} component={Link} to={Path.Main}>
        to the main page
      </Button>
    </div>
  )
}
