import { motion } from 'framer-motion'
import React from 'react'

const animations = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 }
}
export default function Animation({ children }) {
    return (
        <motion.div
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1 }}>
            {children}        </motion.div>
    )
}
