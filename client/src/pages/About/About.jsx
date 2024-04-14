import future from "../../assets/future.png";

export const About = () => {
    return (
        <div className="flex items-center justify-center mt-[100px]">
            <div className="w-[300px] h-[300px] object-contain">
                <img src={ future } alt="Coming Soon" />
            </div>
        </div>
    )
};