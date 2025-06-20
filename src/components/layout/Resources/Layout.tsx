'use client';
import React from 'react';
import { type NextPage } from 'next';
import { motion } from 'framer-motion';

import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';

type Resource = {
	name: string;
	description: string;
	website: string;
	type?: string;
	phone?: string;
	sms?: string;
	hours?: string;
};

type ResourcesDataType = {
	[key: string]: {
		title: string;
		description: string;
		resources: Resource[];
	};
};

const ResourcesData: ResourcesDataType = {
	crisis: {
		title: 'Crisis Support',
		description: "Immediate help is available 24/7. You're not alone.",
		resources: [
			{
				name: 'Crisis Services Canada',
				description: '24/7 suicide prevention and support',
				phone: '1-833-456-4566',
				sms: '45645',
				website: 'https://www.crisisservicescanada.ca',
				hours: '24/7',
			},
			{
				name: 'Kids Help Phone',
				description: 'Support for young people',
				phone: '1-800-668-6868',
				sms: '686868',
				website: 'https://kidshelpphone.ca',
				hours: '24/7',
			},
		],
	},
	mentalHealth: {
		title: 'Mental Health Support',
		description: 'Professional resources and counseling services.',
		resources: [
			{
				name: 'Canadian Mental Health Association',
				description: 'Mental health support and resources',
				website: 'https://cmha.ca',
				type: 'Organization',
			},
			{
				name: 'Wellness Together Canada',
				description: 'Free online mental health support',
				website: 'https://wellnesstogether.ca',
				type: 'Online Service',
			},
		],
	},
	community: {
		title: 'Community Support',
		description: 'Connect with others who understand.',
		resources: [
			{
				name: 'Anxiety Canada',
				description: 'Resources and support groups',
				website: 'https://anxietycanada.com',
				type: 'Support Groups',
			},
		],
	},
};

const ResourcesPage: NextPage = () => {
	const router = useRouter();

	return (
		<motion.div
			className="flex min-h-screen w-screen flex-col items-center justify-start bg-opacity-[10%] bg-clouds-pattern p-10 font-spacemono text-black"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}>
			<div className="absolute left-5 top-5 cursor-pointer rounded-full bg-white p-2" onClick={() => router.back()}>
				<IoArrowBack className="h-10 w-10 p-2 text-black" />
			</div>

			<div className="flex w-full max-w-4xl flex-col gap-8">
				<div className="flex flex-col gap-4 border-2 bg-white p-8 hover:border-black">
					<h1 className="text-4xl font-bold">Resources</h1>
					<p className="text-lg text-gray-700">
						If you're struggling, help is available. These resources are here for you 24/7. In an emergency, always call
						your local emergency services first.
					</p>
				</div>

				{Object.entries(ResourcesData).map(([key, category]) => (
					<motion.div
						key={key}
						className="flex flex-col gap-4 border-2 bg-white p-8 hover:border-black"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}>
						<h2 className="text-2xl font-bold">{category.title}</h2>
						<p className="text-gray-600">{category.description}</p>
						<div className="grid gap-6 md:grid-cols-2">
							{category.resources.map((resource, index) => (
								<div key={index} className="flex flex-col gap-2 rounded-lg border p-4">
									<h3 className="font-bold">{resource.name}</h3>
									<p className="text-sm text-gray-600">{resource.description}</p>
									{resource.phone && (
										<p className="text-sm">
											<span className="font-bold">Call:</span>{' '}
											<a href={`tel:${resource.phone}`} className="text-blue-600 hover:underline">
												{resource.phone}
											</a>
										</p>
									)}
									{resource.sms && (
										<p className="text-sm">
											<span className="font-bold">Text:</span> {resource.sms}
										</p>
									)}
									{resource.website && (
										<a
											href={resource.website}
											target="_blank"
											rel="noopener noreferrer"
											className="text-sm text-blue-600 hover:underline">
											Visit Website
										</a>
									)}
									{resource.hours && <p className="text-sm text-gray-500">Available: {resource.hours}</p>}
								</div>
							))}
						</div>
					</motion.div>
				))}

				<div className="flex flex-col gap-4 border-2 bg-white p-8 hover:border-black">
					<h2 className="text-2xl font-bold">Disclaimer</h2>
					<p className="text-gray-700">
						These resources are provided for informational purposes only. A Thing is not a crisis service or mental
						health provider. In an emergency, always contact your local emergency services or visit the nearest
						emergency room.
					</p>
				</div>
			</div>
		</motion.div>
	);
};

export default ResourcesPage;
