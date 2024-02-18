import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import styles from '../styles/WelcomePage.module.scss';
import Logo from '../assets/logo.png';


export const WelcomePage = () => {
    return (
        <div className={styles.HomePageFullBox}>
            <section className={styles.SectionBox}>
                <div className={styles.LogoBox}>
                    <img src={Logo} alt="" width={"100%"} />
                </div>
                <div className={styles.tagLine}>
                    "Welcome to Luxelands - Your Gateway to Exclusive Properties"
                </div>
                <div className={styles.SliceBox}>
                    <div className={styles.title}>About Luxelands</div>
                    <div className={styles.desc}>Discover a world of opulence and sophistication at Luxelands, where unparalleled luxury meets exceptional real estate. We curate an exquisite collection of properties, from lavish estates to prime lands, providing you with a seamless experience in finding your dream investment.</div>
                </div>
            </section>
            <div className={styles.line}></div>
            <div className={styles.ImageBox + " " + styles.style01}>
                <img src={'https://source.unsplash.com/rMYGCAI_-zU'} className={styles.image} alt="" width={"100%"} />
            </div>
            <section className={styles.SectionBox}>
                <div className={styles.SliceBox}>
                    <div className={styles.title}>Why Choose Luxelands?</div>
                    <ul className={styles.Points}>
                        <li><b> Unrivaled Expertise:</b> Backed by a team of seasoned real estate professionals, Luxelands brings unparalleled expertise to the table. Our in-depth market knowledge ensures that you receive the best advice and opportunities in the luxury real estate landscape.</li>
                        <li><b>Exclusivity Redefined:</b> We understand the importance of exclusivity. Luxelands features properties that are not just houses; they are statements of prestige. Each listing undergoes a rigorous selection process to guarantee an exceptional standard of luxury.</li>
                        <li><b>Seamless Navigation: </b>Our user-friendly website allows you to effortlessly navigate through our extensive collection. Whether you're searching for a majestic residence or a pristine parcel of land, Luxelands makes the process smooth, ensuring you find what you're looking for.</li>
                    </ul>
                </div>
            </section>
            <div className={styles.line}></div>
            <div className={styles.ImageBox + " " + styles.style02}>
                <img src={'https://source.unsplash.com/koLQ6-45B3k'} className={styles.image} alt="" width={"100%"} />
            </div>
            <section className={styles.SectionBox}>
                <div className={styles.SliceBox}>
                    <div className={styles.title}>Explore Extraordinary Living Spaces</div>
                    <div className={styles.desc}>Luxelands offers a diverse portfolio of prestigious properties that redefine luxury living. Immerse yourself in the elegance of architecturally stunning homes and expansive lands, meticulously selected to cater to the most discerning tastes. Our listings showcase the epitome of sophistication, ensuring a lifestyle that reflects your unique aspirations.</div>
                </div>
            </section>
            <div className={styles.line}></div>
            <div className={styles.ImageBox + " " + styles.style03}>
                <img src={'https://source.unsplash.com/Rf77y7Q_WLk'} className={styles.image} alt="" width={"100%"} />
            </div>
            <section className={styles.SectionBox}>
                <div className={styles.SliceBox}>
                    <div className={styles.title}>Your Vision, Our Mission</div>
                    <div className={styles.desc}>
                        At Luxelands, we believe in turning your real estate dreams into reality. Our mission is to be your trusted partner in acquiring the most exceptional properties, providing personalized service that caters to your unique requirements.
                    </div>
                </div>
            </section>
            <div className={styles.line}></div>
            <div className={styles.ImageBox + " " + styles.style04}>
                <img src={'https://source.unsplash.com/A5rCN8626Ck'} className={styles.image} alt="" width={"100%"} />
            </div>
            <section className={styles.SectionBox}>
                <div className={styles.SliceBox}>
                    <div className={styles.title}>Start Your Luxurious Journey Today</div>
                    <div className={styles.desc}>Embark on a journey of luxury and exclusivity with Luxelands. Explore our portfolio, connect with our experienced team, and let us guide you towards acquiring the property of your dreams. Elevate your lifestyle with Luxelands - where luxury knows no bounds.
                    </div>
                </div>
            </section>
            <div className={styles.line}></div>
            <section className={styles.SectionBox}>
                <div className={styles.socialLinksBox}>
                    <a href="https://github.com/PavanGuptaZ" target="_blank" rel="noreferrer"
                        className={styles.linkAnchor} style={{ color: 'black' }}><AiFillGithub style={{ fontSize: "5rem" }} /> GitHub</a>
                    <a href="https://twitter.com/pavangupta1234" target="_blank" rel="noreferrer"
                        className={styles.linkAnchor} style={{ color: 'black' }}><FaXTwitter style={{ fontSize: "5rem" }} /> Twitter-X</a>
                    <a href="https://www.linkedin.com/in/pavan-gupta-68b21b134" target="_blank" rel="noreferrer"
                        className={styles.linkAnchor} ><AiFillLinkedin style={{ fontSize: "5rem", color: "#0A66C2" }} /> Linkedin</a>
                </div>
            </section>
            <div className={styles.line}></div>
            <section className={styles.end}>
                <b>--- Welcome to Luxelands - Your Gateway to Exclusive Properties ---</b>
            </section>
        </div>
    )
}
