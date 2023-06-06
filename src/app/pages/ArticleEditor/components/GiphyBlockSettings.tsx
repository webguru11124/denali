import { IGif } from '@giphy/js-types';
import {
  Grid, // our UI Component to display the results
  SearchBar, // the search bar the user will type into
  SearchContext, // the context that wraps and connects our components
  SearchContextManager, // the context manager, includes the Context.Provider
} from '@giphy/react-components';
import env from 'app/config/env';
import { useContext } from 'react';

interface GiphyBlockSettingsProps {
  onGifClick: (gif: IGif) => void;
}
const GiphyBlockSettings = ({ onGifClick }: GiphyBlockSettingsProps) => {
  const SearchExperience = () => (
    <SearchContextManager apiKey={env.giphyToken}>
      <Components />
    </SearchContextManager>
  );
  const Components = () => {
    const { fetchGifs, searchKey } = useContext(SearchContext);
    return (
      <div className="flex flex-col h-[510px] pl-4 py-4">
        <SearchBar className="mr-4" />
        <div className="mt-5 overflow-auto">
          <Grid
            borderRadius={32}
            key={searchKey}
            columns={2}
            width={500}
            fetchGifs={fetchGifs}
            onGifClick={(gif, e) => {
              e.preventDefault();
              onGifClick(gif);
            }}
          />
        </div>
      </div>
    );
  };
  return <SearchExperience />;
};

export default GiphyBlockSettings;
