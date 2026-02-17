import UserCarousel from "../../layouts/UserCarausel";
import UserLayout from "../../layouts/UserLayout";
import DonationCard from "../../layouts/DonationCard";

export default function Dashboard({data_donasi, data_carousel}) {
    // console.log(data_donasi, data_carousel)

    return (
        <>
            <UserLayout>
                <UserCarousel slides={data_carousel} />

                <div className="w-[1200px] mx-auto mt-4 mb-8">
                    <p className="font-bold text-3xl text-primary-green">
                        Donasi Apa Hari Ini?
                    </p>

                    {/* Grid untuk menampilkan maksimal 3 card menyamping */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                        {data_donasi.map((data_data_donasi) => (
                            <DonationCard key={data_data_donasi.id} kegiatan={data_data_donasi}/>
                        ))}
                    </div>
                </div>

                {/* <h1 className="flex justify-center text-xl p-5">Assalamualaikum</h1>
                <p className="font-bold flex justify-center text-xl p-5">Warahmatullah</p> */}
            </UserLayout>
        </>
    )
}



// function Home() {
//     return(
//         <>
//             <h1 className="flex justify-center text-xl p-5">Assalamualaikum</h1>
//             <p className="font-bold flex justify-center text-xl p-5">Warahmatullah</p>
//         </>
//     );
// }
// Home.layout=page=><UserLayout children={page}/>
// export default Home;