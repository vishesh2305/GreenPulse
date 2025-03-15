import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
  } from "@material-tailwind/react";

  import {Link} from "react-router-dom";
   
export function BackgroundBlogCard(
    {title, subtitle, cardImage, avatarImage, link}
  ) {
    return (
      <Link to={link}>
      <Card
        shadow={false}
        className="hover:cursor-pointer relative grid h-[30rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center m-5"
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
          style={{
            backgroundImage: `url(${cardImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}
        >
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
        </CardHeader>
        <CardBody className="relative py-14 px-6 md:px-12">
          <Typography
            variant="h2"
            color="white"
            className="mb-6 font-medium leading-[1.5]"
          >
            {title}
          </Typography>
          <Typography variant="h5" className="mb-4 text-gray-400">
            {subtitle}
          </Typography>
          <Avatar
            size="xl"
            variant="circular"
            className="border-2 border-white p-2"
            src={avatarImage}
          />
        </CardBody>
      </Card>
      </Link>
    );
  }