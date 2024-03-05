import React, {useEffect, useState} from 'react';
import {Card, Layout, List, Statistic, Tag, Typography} from 'antd';
import {ArrowDownOutlined, ArrowUpOutlined} from '@ant-design/icons';
import {fetchCoin} from '../../redux/slices/getCryptoData.js';
import {fetchAssets} from '../../api.js';
import {percentDifference} from '../../utils.js';
import {useDispatch, useSelector} from 'react-redux';

const SIDER_STYLE = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#001529',
};

function AppSider() {
    const dispatch = useDispatch();
    const items = useSelector(state => state.getCryptoData.items);
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        const preload = async () => {
            const fetchedAssets = await fetchAssets();
            const {result} = items || {};

            const updatedAssets = fetchedAssets.map(asset => {
                const coin = result?.find(c => c.id === asset.id);
                return {
                    grow: asset.price < coin?.price,
                    growPercent: percentDifference(asset.price, coin?.price),
                    totalAmount: asset.amount * coin?.price,
                    totalProfit: asset.amount * coin?.price - asset.amount * asset.price,
                    ...asset,
                };
            });

            setAssets(updatedAssets);
        };
        preload();
    }, [items]);

    const asyncGetCoin = () => {
        dispatch(fetchCoin());
    };

    useEffect(() => {
        const fetchData = async () => {
            await asyncGetCoin();
        };
        fetchData();
    }, []);

    return (
        <Layout.Sider width="25%" style={SIDER_STYLE}>
            {assets.map(asset => (
                <Card key={asset.id} style={{marginTop: '1rem'}}>
                    <Statistic
                        title={asset.id.charAt(0).toUpperCase() + asset.id.slice(1)}
                        value={asset.totalAmount}
                        precision={2}
                        valueStyle={{
                            color: asset.grow ? '#3f8600' : '#cf1322',
                        }}
                        prefix={asset.grow ? <ArrowUpOutlined/> : <ArrowDownOutlined/>}
                        suffix="$"
                    />
                    <List
                        size="small"
                        dataSource={[
                            {title: 'Total Profit', value: asset.totalProfit, withTag: true},
                            {title: 'Asset Amount', value: asset.amount, isPlain: true},
                        ]}
                        renderItem={(item) => (
                            <List.Item>
                                <span>{item.title}</span>
                                <span>
                                      {item.withTag && (
                                          <Tag style={{marginRight: '0.5rem'}} color={asset.grow ? 'green' : 'red'}>
                                              {asset.growPercent.toFixed(2)}%
                                          </Tag>
                                      )}
                                    {item.isPlain && item.value}
                                    {!item.isPlain && (
                                        <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                                            {item.value.toFixed(2)}$
                                        </Typography.Text>
                                    )}
                                </span>
                            </List.Item>
                        )}
                    />
                </Card>
            ))}
        </Layout.Sider>
    );
}

export default AppSider;
