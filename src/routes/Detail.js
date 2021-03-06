import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

const GET_MOVIE = gql`
	query getMovie($id: String!) {
		movie(id: $id) {
			id
			title
			language
			rating
			medium_cover_image
			summary
			isLiked @client
		}
		suggestions(id: $id) {
			id
			medium_cover_image
		}
	}
`;

const Container = styled.div`
	height: 100vh;
	background-image: linear-gradient(-45deg, #d754ab, #fd723a);
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	color: white;
`;

const Column = styled.div`
	margin-left: 10px;
	width: 50%;
`;

const Title = styled.h1`
	font-size: 65px;
	margin-bottom: 15px;
`;

const Subtitle = styled.h4`
	font-size: 35px;
	margin-bottom: 10px;
`;

const Description = styled.p`
	font-size: 28px;
`;

const Poster = styled.div`
	width: 25%;
	height: 60%;
	background-color: transparent;
	background-image: url(${props => props.bg});
	background-size: cover;
	background-position: center center;
`;

export default () => {
	const { id } = useParams();
	const { loading, data } = useQuery(GET_MOVIE, {
		variables: { id }
	});

	// console.log(data);
	if (!data || !data.movie) {
		return <div>hello</div>;
	}
	return (
		<Container>
			<Column>
				<Title>
					{loading
						? "Loading..."
						: `${data.movie.title} ${
								data.movie.isLiked ? "💖" : "😢"
						  }`}
				</Title>
				{!loading && data && data.movie && (
					<>
						<Subtitle>
							{data.movie.language} * {data.movie.rating}
						</Subtitle>
						<Description>{data.movie.summary}</Description>
					</>
				)}
			</Column>
			<Poster
				bg={
					data && data.movie
						? data.movie.medium_cover_image
						: "https://www.topstarnews.net/news/photo/201907/644455_344076_333.jpg"
				}
			></Poster>
		</Container>
	);
};
