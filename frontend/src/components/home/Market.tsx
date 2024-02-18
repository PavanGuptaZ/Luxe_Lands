import { useNavigate } from 'react-router-dom';
// import market from '../../../../assets/market.json';
import styles from '../../styles/UserPage.module.scss'
import { useInfiniteQuery } from '@tanstack/react-query';
import { Fragment } from 'react';
import getPropertyList from '../../apis/properties/getPropertyList';
import { useGetAccessToken } from '../../hooks';
import { BasicBTN } from '../buttons/BasicBTN';
import { PropertyBasicType } from '../../interfaces/api/propertyFace';

type PageMap = { status: "ok", page: number, properties: PropertyBasicType[], totalPages: number, totalProperties: number } | { status: "error", message: string }

export const Market = () => {
    const accessToken = useGetAccessToken()

    const PropertiesQuerys = useInfiniteQuery({
        queryKey: ['Properties'],
        initialPageParam: 1,
        queryFn: ({ pageParam }) => getPropertyList(pageParam, accessToken),
        getNextPageParam: (lastPage, allPages) => lastPage.page < lastPage.totalPages ? allPages.length + 1 : undefined,
        enabled: !!accessToken
    })
    const nextPageFn = () => PropertiesQuerys.fetchNextPage()

    if (PropertiesQuerys.isLoading) {
        return <div className={styles.message}>Loading</div>
    }

    return (
        <div className={styles.PropertyBlockBox}>
            <div className={styles.PropertyBlockList}>
                {PropertiesQuerys.data?.pages && PropertiesQuerys.data.pages.map((page: PageMap, i) => {
                    if (page.status == "error") {
                        return <div className={styles.message}>{page.message}</div>
                    } else {
                        return (
                            <Fragment key={i}>
                                {page?.properties && page.properties.map((property) => {
                                    return <PropertyBlock key={property.id || property._id} data={property} />
                                })}
                            </Fragment>
                        )
                    }
                })}
            </div>
            {PropertiesQuerys.isFetching && <div className={styles.loading}></div>}
            <div style={{ width: "100px", margin: "8px auto" }}>
                {PropertiesQuerys.hasNextPage ?
                    <BasicBTN text='Load More' onClickFn={nextPageFn} disabled={!PropertiesQuerys.hasNextPage || PropertiesQuerys.isFetching} />
                    : <div className={styles.message}>That All</div>}
            </div>
        </div>
    )

}

export const PropertyBlock = ({ data }: { data: PropertyBasicType }) => {
    const navigator = useNavigate()

    return (
        <div className={styles.PropertyBlock} onClick={() => navigator('/home/market/' + data.id)}>
            <div className={styles.imgBox} style={{ background: "url(https://picsum.photos/seed/building/200/100) center/cover no-repeat" }} />
            <div className={styles.name}>{data.name}</div>
            <div className={styles.price}>{data.price / 100} Lakhs</div>
        </div>
    )
}

export const PropertyFullBlock = ({ data }: {
    data: {
        id: string
        name: string;
        location: string;
        area: number;
        price: number;
        overview: string;
        why: string;
        what: string;
        landmark: {
            airpot: { name: string; distance: number; }[];
            highway: { name: string; distance: number; }[];
        };
        map: string;
    }
}) => {
    const navigator = useNavigate()

    return (
        <div className={styles.PropertyBlock} onClick={() => navigator('/home/market/' + data.id)}>
            <div className={styles.imgBox} style={{ background: "url(https://source.unsplash.com/random/300×300?buildings) center/cover no-repeat" }} />
            <div className={styles.name}>{data.name}</div>
            <div className={styles.price}>{data.price / 100} Lakhs</div>
        </div>
    )
}
