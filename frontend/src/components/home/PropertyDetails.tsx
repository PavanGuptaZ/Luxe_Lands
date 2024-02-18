import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import getPropertyById from "../../apis/properties/getPropertyById";
import { useGetAccessToken } from "../../hooks";
import { useState } from "react";
import styles from '../../styles/UserPage.module.scss'
import { BasicBTN } from "../buttons/BasicBTN";
import { BiLocationPlus } from "react-icons/bi";
import { RxLightningBolt } from "react-icons/rx";
import { FiDroplet } from "react-icons/fi";
import { FaCar } from "react-icons/fa";
import { MdOutlineWorkspacePremium, MdArrowOutward, MdOutlineDownload } from "react-icons/md";
import { VscChevronRight } from "react-icons/vsc";
import { BasicBTN2 } from "../buttons/BasicBTN2";
import { PiCheckBold } from "react-icons/pi";
import { toast } from "react-toastify";

export const PropertyDetails = () => {
    const { propertyId } = useParams()
    const accessToken = useGetAccessToken()
    const navigator = useNavigate()
    const [steps, setSteps] = useState([{ type: 1, value: false }, { type: 2, value: false }, { type: 3, value: false }, { type: 4, value: false }, { type: 5, value: false }, { type: 6, value: false }])

    const propertyQuery = useQuery({
        queryKey: [`query-${propertyId}`],
        queryFn: () => getPropertyById(propertyId || "", accessToken),
        enabled: !!accessToken
    })

    const handleSteps = (num: number) => {
        if (num === 0 ? true : steps[num - 1].value) {
            setSteps((prev) => prev.map((step) => step.type == num + 1 ? { ...step, value: true } : step))
        } else {
            toast.warn(`Step ${num} need to complete`)
        }
    }


    if (propertyQuery.isLoading) {
        return <div className={styles.loading}></div>
    } else if (propertyQuery.data?.status == "error") {
        return (
            <div className={styles.errorBox}>
                <BasicBTN text="Back" instyles={{ width: "100px" }} onClickFn={() => navigator('/home/market')} />
                {propertyQuery.data?.message}
            </div>)
    } else if (propertyQuery.data == undefined) {
        return <div>Something Went Wrong</div>
    } else {

        const { name, location, area, price, overview, what, why, category } = propertyQuery.data.property;
        return (
            <div className={styles.PropertyDetailsBox}>
                {/* <BasicBTN text="Back" instyles={{ width: "100px" }} onClickFn={() => navigator('/home/market')} /> */}
                <ul className={styles.BreadcrumbsBox}>
                    <li onClick={() => navigator("/home/market")}>market</li>
                    <li>category {category}</li>
                    <li>{name}</li>
                </ul>
                <div className={styles.PropertyBlock}>
                    <div className={styles.image} style={{ background: "url(https://picsum.photos/seed/building/800/400) center/cover no-repeat" }}></div>
                    <div className={styles.content}>
                        <div className={styles.header}>
                            <div className={styles.details}>
                                <div className={styles.name}>{name}</div>
                                <div className={styles.address}><BiLocationPlus className={styles.icon} />{location}</div>
                                <div className={styles.tagsBox}>
                                    <TagView icon={<RxLightningBolt />} text="Adult Rides" />
                                    <TagView icon={<FiDroplet />} text="Family Rides" />
                                    <TagView icon={<FaCar />} text="Restaurants" />
                                    <TagView icon={<MdOutlineWorkspacePremium />} text="Premium" />
                                </div>
                                <div className={styles.link}> <MdArrowOutward /> <div>View opportunity on polygon</div></div>
                                <div className={styles.contentViewBox}>
                                    <ContentView text={`${area} Acres`} text2="Area" />
                                    <ContentView text={`${price / 100} Lakhs`} text2="Starting Price" />
                                    <ContentView text={`10 Days`} text2="Remaining Days" />
                                    <ContentView text={`2.5 Years`} text2="Nextcheck" />
                                </div>
                            </div>
                            <div className={styles.controls}>
                                <div className={styles.BTN01}><BasicBTN text="completed" /></div>
                                <div className={styles.BTN02}><BasicBTN2 text="Site Vist" icon={<VscChevronRight />} /></div>
                                <div className={styles.readingBox}>
                                    <div className={styles.values}>
                                        <div>Rs {Math.ceil(steps.reduce((value, sum) => sum.value ? value + 1 : value, 0) * price / 6)}</div>
                                        <div>Rs {price}</div>
                                    </div>
                                    <div className={styles.barBox}>
                                        <div className={styles.value} style={{ width: `${Math.ceil(steps.reduce((sum, value) => value.value ? sum + 1 : sum, 0) * 100 / 6)}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.propertyBody}>
                            <div className={styles.propertyDetails}>
                                <DetailsBox title="OverView" text={overview} />
                                <DetailsBox title="Why ?" text={why} />
                                <DetailsBox title="What ?" text={what} />
                            </div>
                            <div className={styles.roadMap}>
                                <StatusBox isCompleted={true} title="Completed Profile" message="Good Job" data="12/12/12" />
                                {steps.map((ele, i) => {
                                    return <StatusBox key={i} isCompleted={ele.value} title={`step ${ele.type}`} message="Completed" tagMessage={'Amount Payed'}
                                        onClickFn={() => handleSteps(i)} />
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export const ContentView = ({ text, text2 }: { text: string, text2: string }) => {
    return (
        <div className={styles.contentViewBlock}>
            <div>{text}</div>
            <div>{text2}</div>
        </div>
    )
}

export const TagView = ({ icon, text }: { icon: React.ReactNode, text: string }) => {
    return (
        <div className={styles.tagBlock}>
            <div>{icon}</div>
            <div>{text}</div>
        </div>
    )
}

export const DetailsBox = ({ title, text }: { title: string, text: string }) => {
    return (
        <div className={styles.DetailsBox}>
            <div className={styles.title}>{title}</div>
            <div className={styles.text}>{text}</div>
        </div>
    )
}

export const StatusBox = (prop:
    { isCompleted: false, title: string, onClickFn: () => void }
    | { isCompleted: true, title: string, message: string, tagMessage?: string, data?: string }
) => {
    return (
        <div className={styles.StatusBox + " " + (prop.isCompleted ? styles.completed : " ")}>
            <div className={styles.checkBox}>{prop.isCompleted ? <PiCheckBold className={styles.TickMark} /> : ""}</div>
            <div className={styles.details}>
                <div className={styles.title}>{prop.title}</div>
                {prop.isCompleted && <div className={styles.tagMessage}>{prop.tagMessage}</div>}
                {prop.isCompleted && <div className={styles.detailsMessage}>{prop.message}</div>}
            </div>
            <div className={styles.StatusContorls}>
                {prop.isCompleted && <div>{prop.data}</div>}
                <div className={styles.BtnBox}>
                    {!prop.isCompleted ? <BasicBTN text={"Complete"} onClickFn={prop.onClickFn} /> : <BasicBTN2 text={"Receipt"} icon={<MdOutlineDownload />} />}
                </div>
            </div>
        </div>
    )
}
