import { Loader } from "@mantine/core";

const Loading = ({ className }: { className?: string }) => {
	return (
		<div className={`flex items-center justify-center ${className ?? "w-full h-64"}`}>
			<Loader />
		</div>
	);
};

export default Loading;
