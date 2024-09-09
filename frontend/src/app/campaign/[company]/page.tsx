// frontend/src/app/campaign/[company]/page.tsx

import React from 'react';
import IntroCarousal from '../components/IntroCarousal';
import IntroHeader from '../components/IntroHeader';
import IntroStatistics from '../components/IntroStatistics';

const CampaignPage: React.FC = () => {
    return (
        <div>
            <IntroCarousal/>
            <IntroHeader 
                logo={"https://picsum.photos/200/300"}
                companyName={"Tarhahawa"} 
                description={"Company details"}
                location={"Europe"}/>
            <IntroStatistics />
        </div>
    );
};

export default CampaignPage;
