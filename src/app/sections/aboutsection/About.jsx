"use client";

import { motion } from "framer-motion";
import { TypingText } from "@/app/components/CustomTexts";
import { fadeIn, staggerContainer } from "../../utils/motion";
import styles from "../../styles/index";
const About = () => (
  <section>
    <div className="gradient-02 z-0" />
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title="| About Anyfood" textStyles="text-center" />

      <motion.p
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="mt-[8px] font-pops text-black font-light tablet:text-[20px] text-[15px] text-center text-secondary-white px-[50px]"
      >
        <span className="font-extrabold text-secondary">Anyfood</span> Our
        review food website combines the power of blockchain technology with a
        love for food. We offer a secure and trustworthy platform for unbiased
        and authentic restaurant reviews, creating a community that celebrates
        culinary diversity and innovation.
      </motion.p>
    </motion.div>
  </section>
);

export default About;
