/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

const Pulsar = require('../index.js');

(() => {
  describe('Consumer', () => {
    const client = new Pulsar.Client({
      serviceUrl: 'pulsar://localhost:6650',
      operationTimeoutSeconds: 30,
    });
    describe('Create', () => {
      test('No Topic', async () => {
        await expect(client.subscribe({
          subscription: 'sub1',
          ackTimeoutMs: 10000,
        })).rejects.toThrow('Topic is required and must be specified as a string when creating consumer');
      });

      test('Not String Topic', async () => {
        await expect(client.subscribe({
          topic: 0,
          subscription: 'sub1',
          ackTimeoutMs: 10000,
        })).rejects.toThrow('Topic is required and must be specified as a string when creating consumer');
      });

      test('No Subscription', async () => {
        await expect(client.subscribe({
          topic: 'persistent://public/default/t1',
          ackTimeoutMs: 10000,
        })).rejects.toThrow('Subscription is required and must be specified as a string when creating consumer');
      });

      test('Not String Subscription', async () => {
        await expect(client.subscribe({
          topic: 'persistent://public/default/t1',
          subscription: 0,
          ackTimeoutMs: 10000,
        })).rejects.toThrow('Subscription is required and must be specified as a string when creating consumer');
      });

      test('Not Exist Tenant', async () => {
        await expect(client.subscribe({
          topic: 'persistent://no-tenant/namespace/topic',
          subscription: 'sub1',
          ackTimeoutMs: 10000,
        })).rejects.toThrow('Failed to create consumer: ConnectError');
      });

      test('Not Exist Namespace', async () => {
        await expect(client.subscribe({
          topic: 'persistent://public/no-namespace/topic',
          subscription: 'sub1',
          ackTimeoutMs: 10000,
        })).rejects.toThrow('Failed to create consumer: ConnectError');
      });
    });
  });
})();
